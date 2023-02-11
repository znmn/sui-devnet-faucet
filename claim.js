const axios = require("axios"),
	readline = require("readline-sync"),
	delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
	console.log(`[I] SUI Devnet Faucet Claim`);
	console.log(`[I] Info: https://github.com/znmn\n`);
	const address = readline.question("[?] Enter your address[0x...]: "),
		n = readline.question("[?] Enter the number of claims[leave blank for infinity]: ", { defaultInput: Infinity });

	console.log(`\n[+] Claiming ${n} times for ${address}...`);
	for (let i = 0; i < n; i++) {
		try {
			const response = await axios.post("https://faucet.devnet.sui.io/gas", {
				FixedAmountRequest: {
					recipient: address,
				},
			});
			console.log(`[+] Claimed 0.05 SUI for ${address}`);
		} catch (e) {
			if (e.response.status === 429) {
				console.log(`[!] Rate limit reached, waiting 1 minute...`);
				await delay(60000);
				i--;
				continue;
			}
			console.log(`[-] Failed to claim SUI for ${address}`);
		}
	}
})();
