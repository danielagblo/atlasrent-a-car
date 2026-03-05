require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');
const path = require('path');

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function migrate() {
    const assetsDir = path.join(process.cwd(), 'public', 'assets');
    if (!await fs.pathExists(assetsDir)) {
        console.log('No public/assets found.');
        return;
    }

    const files = await fs.readdir(assetsDir);
    console.log(`Found ${files.length} files in assets. Uploading...`);

    for (const file of files) {
        const filePath = path.join(assetsDir, file);
        if ((await fs.stat(filePath)).isDirectory()) continue;

        console.log(`Uploading ${file}...`);
        try {
            const publicId = `assets/${path.parse(file).name}`;
            await cloudinary.uploader.upload(filePath, {
                public_id: publicId,
                folder: 'ekgsite',
                overwrite: true,
            });
            console.log(`Successfully uploaded ${file} as ${publicId}`);
        } catch (error) {
            console.error(`Failed to upload ${file}:`, error.message);
        }
    }

    // Handle existing uploads from public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (await fs.pathExists(uploadsDir)) {
        const uploadFiles = await fs.readdir(uploadsDir);
        console.log(`Found ${uploadFiles.length} files in uploads. Uploading...`);
        for (const file of uploadFiles) {
            const filePath = path.join(uploadsDir, file);
            if ((await fs.stat(filePath)).isDirectory()) continue;
            console.log(`Uploading upload ${file}...`);
            try {
                await cloudinary.uploader.upload(filePath, {
                    public_id: path.parse(file).name,
                    folder: 'ekgsite/uploads',
                    overwrite: true,
                });
            } catch (error) {
                console.error(`Failed upload for ${file}:`, error.message);
            }
        }
    }

    console.log('Migration complete!');
}

migrate();
