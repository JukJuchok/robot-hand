import { throttle } from './throttle';

interface RobotConfig {
	port: SerialPort;
}

export class Robot {
	port;
	textEncoder;

	constructor(config: RobotConfig) {
		this.port = config.port;
		this.textEncoder = new TextEncoder();

		// todo: add throttle destroyer
		this.send = throttle(this.send.bind(this), 100);
	}

	send(data: number[]) {
		// todo: remove slice later
		const message = this.textEncoder.encode(data.slice(0, -1).join(' ') + '\n');

		const writer = this.port.writable.getWriter();
		writer.write(message);
		writer.releaseLock();
	}
}
