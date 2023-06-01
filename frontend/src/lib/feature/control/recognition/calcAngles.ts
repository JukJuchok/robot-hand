function degrees(radians: number) {
	return radians * (180 / Math.PI);
}

interface Point {
	x: number;
	y: number;
	z: number;
}

function calcAngle(a: Point, b: Point, c: Point) {
	const v1 = {
		x: a.x - b.x,
		y: a.y - b.y,
		z: a.z - b.z
	};

	const v2 = {
		x: c.x - b.x,
		y: c.y - b.y,
		z: c.z - b.z
	};

	const v1mag = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
	const v1norm = {
		x: v1.x / v1mag,
		y: v1.y / v1mag,
		z: v1.z / v1mag
	};

	const v2mag = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);
	const v2norm = {
		x: v2.x / v2mag,
		y: v2.y / v2mag,
		z: v2.z / v2mag
	};

	const res = v1norm.x * v2norm.x + v1norm.y * v2norm.y + v1norm.z * v2norm.z;
	const angleRad = Math.acos(res);
	return degrees(angleRad);
}

export function calcAngles(points: Point[]) {
	return [
		// Pinky
		calcAngle(points[9], points[13], points[17]), // metacarpus flexion

		calcAngle(points[13], points[17], points[18]), // proximal phalanx rotation
		calcAngle(points[0], points[17], points[18]), // proximal phalanx flexion
		calcAngle(points[17], points[18], points[19]), // middle and distal phalanx flexion

		// Ring finger
		calcAngle(points[14], points[13], points[17]), // proximal phalanx rotation
		calcAngle(points[0], points[13], points[14]), // proximal phalanx flexion
		calcAngle(points[13], points[14], points[15]), // middle and distal phalanx flexion

		// Middle finger
		calcAngle(points[10], points[9], points[13]), // proximal phalanx rotation
		calcAngle(points[0], points[9], points[10]), // proximal phalanx flexion
		calcAngle(points[9], points[10], points[11]), // middle and distal phalanx flexion

		// Index finger
		calcAngle(points[6], points[5], points[9]), // proximal phalanx rotation
		calcAngle(points[0], points[5], points[6]), // proximal phalanx flexion
		calcAngle(points[5], points[6], points[7]), // middle and distal phalanx flexion

		// Thumb
		calcAngle(points[1], points[5], points[9]), // metacarpus flexion

		calcAngle(points[1], points[0], points[5]), // proximal phalanx rotation
		calcAngle(points[0], points[1], points[2]), // proximal phalanx flexion
		calcAngle(points[1], points[2], points[3]) // middle and distal phalanx flexion
	];
}
