const igdl = require("@sasmeee/igdl");

module.exports = async (req, res) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL parameter required"
            });
        }

        const data = await igdl(url);

        if (!data || !data.data || data.data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No media found"
            });
        }

        res.status(200).json({
            success: true,
            creator: "Ajsal Sparky",
            result: data.data.map(v => ({
                type: v.type || "video",
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
