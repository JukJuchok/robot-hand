import path from 'path';
import * as fs from 'fs';

export function mediapipeWorkaround() {
	return {
		name: 'mediapipe_workaround',
		load(id: string) {
			const MEDIAPIPE_EXPORT_NAMES = {
				'hands.js': ['VERSION', 'HAND_CONNECTIONS', 'Hands']
			};

			const fileName = path.basename(id);
			if (!(fileName in MEDIAPIPE_EXPORT_NAMES)) return null;
			let code = fs.readFileSync(id, 'utf-8');
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			for (const name of MEDIAPIPE_EXPORT_NAMES[fileName]) {
				code += `exports.${name} = ${name};`;
			}
			return { code };
		}
	};
}
