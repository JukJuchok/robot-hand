export interface DataItem {
	time: number;
	positions: number[];
}

interface RecordConfigType {
	data: DataItem[];
	send: (positions: number[]) => void;
	onTimeUpdate: (time: number) => void;
	onPlayingChange: (playing: boolean) => void;
}

export class Record {
	data;
	send;
	onTimeUpdate;
	onPlayingChange;

	dataItemIndex?: number;

	prevTime?: number;
	time = 0;

	requestId?: number;

	playing = false;
	shadowPaused = false;

	repeat = false;

	constructor(config: RecordConfigType) {
		this.data = config.data;
		this.send = config.send;
		this.onTimeUpdate = config.onTimeUpdate;
		this.onPlayingChange = config.onPlayingChange;

		this.loop = this.loop.bind(this);
	}

	setTime(time: number) {
		if (time < 0 || time > this.data[this.data.length - 1].time) {
			throw new Error(`invalid time: ${time}`);
		}

		this.shadowPaused = true;
		if (this.requestId !== undefined) {
			cancelAnimationFrame(this.requestId);
		}

		this.time = time;
		this.onTimeUpdate(this.time);

		this.selectFrame();
	}

	selectFrame() {
		if (this.time === this.data[this.data.length - 1].time) {
			if (this.dataItemIndex !== this.data.length - 1) {
				this.dataItemIndex = this.data.length - 1;
				this.send(this.data[this.dataItemIndex].positions);
			}
			return;
		}

		const index =
			this.data.findIndex((item) => {
				return this.time < item.time;
			}) - 1;

		if (this.dataItemIndex !== index) {
			this.dataItemIndex = index;
			this.send(this.data[this.dataItemIndex].positions);
		}
	}

	loop() {
		const elapsed = performance.now() - this.prevTime!;
		this.prevTime = performance.now();

		this.time += elapsed;

		if (this.time >= this.data[this.data.length - 1].time) {
			if (this.repeat) {
				this.time = 0;
				this.requestId = requestAnimationFrame(this.loop);
			} else {
				this.time = this.data[this.data.length - 1].time;
				this.playing = false;
				this.onPlayingChange(this.playing);
			}
		} else {
			this.requestId = requestAnimationFrame(this.loop);
		}

		this.onTimeUpdate(this.time);

		this.selectFrame();
	}

	play() {
		if (this.playing && !this.shadowPaused) return;
		this.playing = true;

		this.onPlayingChange(this.playing);
		this.shadowPaused = false;

		this.prevTime = performance.now();
		this.requestId = requestAnimationFrame(this.loop);
	}

	pause() {
		if (!this.playing) return;
		this.playing = false;
		this.onPlayingChange(this.playing);

		if (this.requestId !== undefined) {
			cancelAnimationFrame(this.requestId);
		}
	}

	destroy() {
		if (this.requestId !== undefined) {
			cancelAnimationFrame(this.requestId);
		}
	}
}
