document.addEventListener('DOMContentLoaded', async () => {
    const rpcEndpoint = 'https://rpc.octa.space'; // Ethereum RPC endpoint
    const targetBlockNumber = BigInt('4500000'); // Target block number (change as needed)

    // Create a Web3 instance with the specified RPC endpoint
    const web3 = new Web3(rpcEndpoint);

    // Function to update the countdown timer display, current block number, and block time
    function updateCountdownDisplay(days, hours, minutes, seconds, currentBlock, blockTime) {
        const countdownDisplay = document.querySelector('.count');
        countdownDisplay.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

        const blockNumberDisplay = document.getElementById('block-number');
        blockNumberDisplay.textContent = currentBlock;

        const blockTimeDisplay = document.getElementById('block-time');
        blockTimeDisplay.textContent = `${blockTime} seconds`;
    }

    // Update the countdown clock, current block number, and block time every second
    setInterval(async () => {
        try {
            // Get the latest block
            const latestBlock = await web3.eth.getBlock('latest');

            // Extract block number and timestamp
            const latestBlockNumber = BigInt(latestBlock.number);
            const blockTimestamp = latestBlock.timestamp;

            // Calculate blocks remaining
            const blocksRemaining = targetBlockNumber - latestBlockNumber;

            if (blocksRemaining <= 0n) {
                // Target block has been reached
                updateCountdownDisplay(0, 0, 0, 0, latestBlockNumber.toString(), 0); // Update display accordingly
            } else {
                // Calculate remaining time in seconds
                const remainingSeconds = Number(blocksRemaining) * 15; // Assuming 15 seconds per block

                // Convert remaining seconds into days, hours, minutes, and seconds
                const days = Math.floor(remainingSeconds / (3600 * 24));
                const hours = Math.floor((remainingSeconds % (3600 * 24)) / 3600);
                const minutes = Math.floor((remainingSeconds % 3600) / 60);
                const seconds = remainingSeconds % 60;

                // Update the countdown timer display, current block number, and block time display
                updateCountdownDisplay(days, hours, minutes, seconds, latestBlockNumber.toString(), latestBlock.timestamp);

            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, 1000); // Update every second
});
