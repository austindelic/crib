<script lang="ts">
	let joinCode: string | null = null;

	async function generateJoinCode() {
		const response = await fetch('/houses/code/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				action: 'createJoinCode'
			})
		});

		const result = await response.json();
		if (result.success) {
			joinCode = result.joinCode;
		} else {
			alert('Failed to generate join code');
		}
	}
</script>

<button on:click={generateJoinCode}>Generate Join Code</button>

{#if joinCode}
	<p>Your join code is: {joinCode}</p>
{/if}
