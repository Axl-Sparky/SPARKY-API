const ig = require("instagram-url-direct");

module.exports = async (req, res) => {
    try {
        let { url } = req.query;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL parameter required"
            });
        }

        url = url.split("?")[0];

        const result = await ig(url);

        if (!result || result.length === 0) {
            return res.json({
                success: false,
                message: "No media found"
            });
        }

        res.status(200).json({
            success: true,
            creator: "Ajsal Sparky",
            result: result.map(v => ({
                type: "video",
                url: v.url
            }))
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


