<script>
  // @ts-nocheck
  //   let doc;
  //     import { onMount } from "svelte";

  //   import "../../global.css"; // This is Global css file which is used for creating layout
  //   let docName; // Doctor name for binding
  //   let docBio; // Doctor Bio for Binding
  //   let docPass; // Doctor Password for binding
  //   let doctors = []; // Doctors Will Contain Data of Doctor
  //    // From Local server we are geting doctor
  //   const addDoctor = (name, bio, pass) => {
  //     doctors = [{ dname: name, dbio: bio, pass: pass }];
  //     localStorage.setItem("doctor", JSON.stringify(doctors));
  //     alert("You Have Logged in")
  //     window.location.href = "/addPresc"
  //   };

  // onMount(()=>{
  //     doc = (JSON.parse(localStorage.getItem("doctor")) == null) ? true : false
  //   })

  import { invalidateAll } from "$app/navigation";
  import { appwrite } from "$lib/appwrite";

  let formError = " ";

  async function handleSubmit(event) {
    event.preventDefault();
    formError = " ";

    const form = /** @type {HTMLFormElement} */ (event.target);
    const formData = /** @type Record<string, string | undefined> */ (
      Object.fromEntries(new FormData(form).entries())
    );

    const { email, password } = formData;
    if (!email || !password) {
      formError = "Please fill out all fields";
      return;
    }

    try {
      formError = "Logging..."
      await appwrite.account.createEmailSession(email, password);
      await invalidateAll();
    } catch (e) {
      formError = /** @type {import('appwrite').AppwriteException} */ (e)
        .message;
    }
  }
</script>

<h1>Login</h1>

<div class="discription">
  <form on:submit={handleSubmit}>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input
        name="email"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
      <div id="emailHelp" class="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input
        name="password"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <br />
  <p>{formError}</p>
  <br />
  <br />
  <a href="/signup">Don't have any Account Create One</a>
</div>

<!-- <div class="discription">
  {#if (doc)}
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label"
      >Doctor's Name</label
    >
    <input
      type="text"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Doctor's Name"
      bind:value={docName}
    />
  </div>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Password</label>
    <input
      type="password"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Enter Your Password"
      bind:value={docPass}
    />
  </div>
  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label"
      >Doctor's Bio</label
    >
    <textarea
      class="form-control"
      id="exampleFormControlTextarea1"
      rows="3"
      bind:value={docBio}
      placeholder="Enter Your Bio "
    ></textarea>

  </div>

  <button
    type="button"
    class="btn btn-outline-dark"
    on:click={() => addDoctor(docName, docBio, docPass)}>Log in</button
    
  >

  {:else}
  <h1>You Can Log Out By Clicking this</h1>
  <button
  type="button"
  class="btn btn-outline-dark"
  on:click={() =>{ localStorage.removeItem("doctor"); window.location.href = "/" }}>Log out</button
>
  
  {/if}
  <br>
  <a href="/signup">Don't have any Account Create One</a>

</div> -->
