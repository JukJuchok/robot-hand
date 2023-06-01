type Connection = [number, number];

export type Point = { x: number; y: number; z: number };

export function project(
	point: Point,
	projectionCenterX: number,
	projectionCenterY: number,
	fieldOfView: number
) {
	const sizeProjection = fieldOfView / (fieldOfView + point.z);
	const xProject = point.x * sizeProjection + projectionCenterX;
	const yProject = point.y * sizeProjection + projectionCenterY;
	return {
		size: sizeProjection,
		x: xProject,
		y: yProject
	};
}

export function drawShape(
	ctx: CanvasRenderingContext2D,
	points: Point[],
	connections: Connection[],
	projectionCenterX: number,
	projectionCenterY: number,
	fieldOfView: number,
	color: string,
	lineWidth: number
) {
	const lines = connections.map((connection) => [points[connection[0]], points[connection[1]]]);

	for (const line of lines) {
		const projectionStart = project(line[0], projectionCenterX, projectionCenterY, fieldOfView);
		const projectionEnd = project(line[1], projectionCenterX, projectionCenterY, fieldOfView);
		ctx.beginPath();
		ctx.moveTo(projectionStart.x, projectionStart.y);
		ctx.lineTo(projectionEnd.x, projectionEnd.y);
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = 'round';
		ctx.stroke();
	}
}
