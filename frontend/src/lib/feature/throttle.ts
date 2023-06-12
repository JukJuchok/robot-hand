export function throttle<R, A extends any[]>(cb: (...args: A) => R, delay: number) {
	let shouldWait = false;
	let waitingArgs: any;

	const timeoutFunc = () => {
		if (waitingArgs == null) {
			shouldWait = false;
		} else {
			cb(...waitingArgs);
			waitingArgs = null;
			setTimeout(timeoutFunc, delay);
		}
	};

	return (...args: any) => {
		if (shouldWait) {
			waitingArgs = args;
			return;
		}

		cb(...args);
		shouldWait = true;
		setTimeout(timeoutFunc, delay);
	};
}
