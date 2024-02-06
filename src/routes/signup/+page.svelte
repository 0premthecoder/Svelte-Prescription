<!-- src/routes/signup/+page.svelte -->
<script>
    import "../../global.css";
    import { invalidateAll } from "$app/navigation";
    import { appwrite } from "$lib/appwrite";
    import { ID } from "appwrite";

    /** @type {string|null} */
    let formError = null;

    /**
     * @param {Event} event
     */
    async function handleSubmit(event) {
        event.preventDefault();
        formError = null;

        const form = /** @type {HTMLFormElement} */ (event.target);
        const formData = /** @type Record<string, string | undefined> */ (
            Object.fromEntries(new FormData(form).entries())
        );

        const { name, email, password } = formData;
        if (!name || !email || !password) {
            formError = "Please fill out all fields";
            return;
        }

        try {
            await appwrite.account.create(ID.unique(), email, password, name);
            await appwrite.account.createEmailSession(email, password);
            await invalidateAll();
        } catch (e) {
            formError = /** @type {import('appwrite').AppwriteException} */ (e)
                .message;
        }
    }
</script>
<div class="discription">
<form on:submit={handleSubmit}>
    <div class="mb-3">
        <label for="exampleInputName1" class="form-label">Full Name: </label>
        <input type="text" name="name" class="form-control" id="exampleInputName1" />
    </div>
    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
            type="email"
            name="email"
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
            type="password"
            name="password"
            class="form-control"
            id="exampleInputPassword1"
        />
    </div>
    <button type="submit" class="btn btn-outline-dark">Submit</button>
    <p>{formError}</p>
</form>
</div>