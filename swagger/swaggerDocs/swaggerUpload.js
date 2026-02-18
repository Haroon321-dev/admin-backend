/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload related APIs
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a single file
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myFile:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File uploaded successfully!"
 *                 file:
 *                   type: string
 *                   example: "my_uploaded_file.jpg"
 *       400:
 *         description: Bad request (No file uploaded or error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No file uploaded!"
 */
