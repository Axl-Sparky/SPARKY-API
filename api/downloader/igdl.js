const { default: instagramGetUrl } = require("instagram-url-direct");

module.exports = async (req, res) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL parameter required"
            });
        }

        const result = await instagramGetUrl(url);

        if (!result || result.length === 0) {
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
                    url: result[0].url
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
