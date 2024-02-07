<script>
  // @ts-nocheck
  import "../../global.css"; // This is Global css file which is used for creating layout
  import { appwrite } from "$lib/appwrite"; // for adding idea'
  
  import {addMedicines} from "$lib/medicine"
  let medicines = [
    {
      name: "",
      quantity: "",
      dose: "",
    },
  ];
  let _id; // Doctor name for binding
  let info = ""
  let patientName; // Doctor Bio for Binding


  const addPresc = async (id, patient, medicines) => {
    // It will add prescription to local storage
    // // let b = JSON.parse(localStorage.getItem("doctor")); // we are parsing doctors from local storage
    // if (JSON.parse(localStorage.getItem("presc")) == null) {
    //   // We have checked if there is old prescription if it is we will add that also
    //   prescription = [];
    // } else {
    //   prescription = JSON.parse(localStorage.getItem("presc"));
    // }
    info = "Fetching Doctor INfo..."
    let data = await appwrite.account.get()
    info = "Making unique ID..."
    let document = await addMedicines(patient, data.name, JSON.stringify(medicines))
    info = "Copy Your Prescription ID..."
    _id = document.$id
    let prescription = []; // having prescription
    prescription.push({
      // this will push it to prescription variable
      _id: id,
      docName: data.name,
      patName: patient,
      medic: medicines,
    });

  //   localStorage.setItem("presc", JSON.stringify(
  // (await getMedicines()).documents));
    
    // addIdea(presc.patName, presc.docName)
    
    
    
  };

 
  const addNewTab = () => {
    medicines = [...medicines, { name: "", quantity: "", dose: "" }];
  };
</script>

<!-- bind keyword is used for changing variable when there is input  -->
<h1>Prescription</h1>
<div class="discription">
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label"
      >Patient's Name</label
    >
    <input
      type="text"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Patient's Name"
      bind:value={patientName}
    />
  </div>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label"
      >Prescription Id</label
    >
    <input
    readonly
      type="text"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Prescription Id Will be Shown Here"
      bind:value={_id}
    />
  </div>
  <div class="mb-3" id="tab">
    <label for="exampleFormControlTextarea1" class="form-label"
      >Prescription</label
    >
    <!-- <textarea
      class="form-control"
      id="exampleFormControlTextarea1"
      rows="3"
      bind:value={medicines}
      placeholder="Enter Your Prescription "
    ></textarea> -->
    {#each medicines as m, i}
      <div class="input-group mb-3">
        <input
          id={i}
          type="text"
          class="form-control"
          bind:value={medicines[i].name}
          placeholder="Name of Medicine"
          aria-label="Username"
        />
        <span class="input-group-text">@</span>
        <input
          id={i}
          type="text"
          class="form-control"
          bind:value={medicines[i].quantity}
          placeholder="Quantity"
          aria-label="Server"
        />
        <span class="input-group-text">#</span>
        <input
          id={i}
          type="text"
          class="form-control"
          bind:value={medicines[i].dose}
          placeholder="Dose"
          aria-label="Server"
        />
      </div>
    {/each}
  </div>

  <button on:click|preventDefault={addNewTab}>+</button>
  <br />
  <br />

  <button
    type="button"
    class="btn btn-outline-dark"
    on:click={() => {
      addPresc(_id, patientName, medicines);
      
    }}>Issue New Prescription</button
  >
  <p>{info}</p>
</div>
