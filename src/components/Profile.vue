<template>
  <div style="text-align:left">
    <h3>Profile</h3>
    <hr />
    <div class="form-group">
      <label for="inst" class="col-md-3 col-form-label">Full Name</label>
      <div class="col">
        <input type="text" class="form-control" v-model="profile.name" autocomplete="name" placeholder="Full Name" />
      </div>
    </div>
    <div class="form-group">
      <label for="deg" class="col-md-3 col-form-label">Email</label>
      <div class="col">
        <input type="text" class="form-control" v-model="profile.email" autocomplete="email" placeholder="Email" />
      </div>
    </div>
    <div class="form-group">
      <label for="date" class="col-md-3 col-form-label">Phone</label>
      <div class="col">
        <input type="text" class="form-control" v-model="profile.phone" autocomplete="phone" placeholder="Phone" />
      </div>
    </div>
    <div class="form-group">
      <label for="end" class="col-md-3 col-form-label">Address</label>
      <div class="col">
        <input type="text" class="form-control" v-model="profile.address" autocomplete="address" placeholder="Address" />
      </div>
    </div>
    <div class="form-group">
      <label for="end" class="col-md-3 col-form-label">Website</label>
      <div class="col">
        <input type="text" class="form-control" v-model="profile.website" autocomplete="website" placeholder="Website" />
      </div>
    </div>
    <div class="form-group">
      <label for="end" class="col-md-3 col-form-label">Portfolio</label>
      <div class="col">
        <input type="text" class="form-control" v-model="profile.github" autocomplete="portfolio" placeholder="Portfolio" />
      </div>
    </div>
    <div class="form-group">
      <label for="end" class="col-md-3 col-form-label">Linkedin</label>
      <div class="col">
        <input type="text" class="form-control" v-model="profile.linkedin" autocomplete="linkedin" placeholder="Linkedin" />
      </div>
    </div>
    <div class="form-group">
      <label for="end" class="col-md-3 col-form-label">Summary</label>
      <div class="col">
        <input type="text" class="form-control" v-model="profile.summary" autocomplete="summary" placeholder="Summary" />
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "Profile",
  props: ["profile"],
};
</script>
