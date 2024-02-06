<script>
    import '../global.css'
    import { invalidateAll } from '$app/navigation';
	import { appwrite } from '$lib/appwrite.js';

	export let data;

	$: loggedIn = !!data.account;
	let load = ""

	async function logout() {
		load=">Loging Out.."
		await appwrite.account.deleteSession('current');
		// invalidateAll will execute all `load` functions again.
		// In our case, this means we'll fetch the account data again.
		await invalidateAll();
	}
</script>
<div class="discription">
{#if loggedIn}
	<p>Hello {data.account?.name}!</p>
	<button class="btn btn-outline-dark" on:click={logout}>Logout</button>
	<p>{load}</p>
{:else}
<h1 id="h1">Welcome User !</h1>
{/if}

<div class="discription" style="border: 1px solid grey; padding: 10px; border-radius: 15px; margin-top:20px">
    This website serves the crucial function of ensuring that any medication ordered comes with a valid prescription from a certified doctor. We aims to enhance secure and responsible medication practices through  incorporating this prescription verification step. Users can trust the authenticity of their prescribed medications, fostering confidence in the reliability and safety of the healthcare process. We strives to streamline the prescription validation process, promoting a seamless and secure experience for both healthcare professionals and individuals seeking prescribed medications.
</div>
</div>