module.exports = async (req, res) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL parameter required"
            });
        }

        const response = await fetch(
            `https://snapinsta.app/action.php?lang=en`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                body: `url=${encodeURIComponent(url)}`
            }
        );

        const html = await response.text();

        const match = html.match(/https?:\/\/[^"]+\.mp4[^"]*/);

        if (!match) {
            return res.json({
                success: false,
                message: "No media found"
            });
        }

        res.status(200).json({
            success: true,
            creator: "Ajsal Sparky",
            result: [
                {
                    type: "video",
                    url: match[0]
                }
            ]
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
