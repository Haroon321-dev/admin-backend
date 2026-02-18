/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Service related APIs
 */

/**
 * @swagger
 * /api/data/service:
 *   get:
 *     summary: Get all services with pagination
 *     tags: [Services]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 4
 *         description: Number of services per page (default is 4)
 *     responses:
 *       200:
 *         description: List of services retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "63f1a7b8d8f7e2a1b2c3d4e5"
 *                       title:
 *                         type: string
 *                         example: "Web Development"
 *                       description:
 *                         type: string
 *                         example: "We provide professional web development services."
 *                       price:
 *                         type: number
 *                         example: 500
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
