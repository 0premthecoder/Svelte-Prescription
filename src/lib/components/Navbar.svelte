<script>
  // @ts-nocheck

  // import { invalidateAll } from '$app/navigation';
  // import { appwrite } from '$lib/appwrite.js';

  // export let data;

  // $: loggedIn = !!data.account;

  // async function logout() {
  // 	await appwrite.account.deleteSession('current');
  // 	// invalidateAll will execute all `load` functions again.
  // 	// In our case, this means we'll fetch the account data again.
  // 	await invalidateAll();
  // }


  let a = "active"; // We will use it for doing dry principle
  let home = false; // Checking Active home, login etc.
  let login = false;
  let add = false;
  let ch = false;

 
  $: makeActivLogin = () => {
    home = false;
    login = true;
    add = false;
    ch = false;
  };
  $: makeActiveAdd = () => {
    home = false;
    login = false;
    add = true;
    ch = false;
  };
  $: makeactiveCheck = () => {
    home = false;
    login = false;
    add = false;
    ch = true;
  };
  $: makeactiveHome = () => {
    home = true;
    login = false;
    add = false;
    ch = false;
  };
</script>

<!-- On:click is the function in svelte same as onclick in html -->
<ul class="nav nav-tabs">
  <li class="nav-item">
    <!-- svelte-ignore missing-declaration -->
    <a
      class="nav-link {home ? a : ''}"
      on:click={makeactiveHome}
      aria-current="page"
      href="/">Home</a
    >
  </li>
  <li class="nav-item">
    <!-- svelte-ignore missing-declaration -->
    <a class="nav-link {login ? a : ''}" on:click={makeActivLogin} href="/login"
      >Login as Doctor</a
    >
  </li>
  <!-- svelte-ignore missing-declaration -->
  
    <li class="nav-item">
      <a
        class="nav-link {add ? a : ''}"
        href="/addPresc"
        on:click={makeActiveAdd}>Add Prescription</a
      >
    </li>
  <li class="nav-item">
    <!-- svelte-ignore missing-declaration -->
    <a
      class="nav-link {ch ? a : ''}"
      aria-disabled="true"
      on:click={makeactiveCheck}
      href="/checkPre">Check Prescription</a
    >
  </li>
</ul>

<style>
  a {
    cursor: pointer;
    text-decoration: none;
    /* padding: 50px; */
    margin-left: 20px;
  }
  a:hover {
    border-bottom: 2px solid green;
  }
</style>
