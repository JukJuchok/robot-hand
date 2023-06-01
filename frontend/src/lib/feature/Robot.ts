interface RobotConfig {
	port: SerialPort;
}

export class Robot {
	port;
	textEncoder;

	constructor(config: RobotConfig) {
		this.port = config.port;
		this.textEncoder = new TextEncoder();
	}

	send(data: number[]) {
		console.log(data);

		const message = this.textEncoder.encode(data.join(' ') + '\n');

		const writer = this.port.writable.getWriter();
		writer.write(message);
		writer.releaseLock();
	}
}
