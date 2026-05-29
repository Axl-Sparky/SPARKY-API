module.exports = async (req, res) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL parameter required"
            });
        }

        const api = await fetch(
            `https://www.save-free.com/process?url=${encodeURIComponent(url)}`
        );

        const data = await api.text();

        const match = data.match(/https?:\/\/[^"]+\.mp4[^"]*/);

        if (!match) {
            return res.status(404).json({
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
