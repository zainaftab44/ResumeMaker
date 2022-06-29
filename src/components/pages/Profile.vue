<template>
	<span style="text-align:left">
		<h3>Profile</h3>
		<hr />
		<Input label="Full Name" :val="profile.name" @input="profile.name = $event" />
		<Input label="Job Title" :val="profile.title" @input="profile.title = $event" />
		<Input label="Email Address" :val="profile.email" @input="profile.email = $event" />
		<Input label="Phone" :val="profile.phone" @input="profile.phone = $event" />
		<Input label="Address" :val="profile.address" @input="profile.address = $event" />
		<Input label="Website" :val="profile.website" @input="profile.website = $event" />
		<Input label="Portfolio" :val="profile.github" @input="profile.github = $event" />
		<Input label="LinkedIn" :val="profile.linkedin" @input="profile.linkedin = $event" />
		<TArea label="Summary" :val="profile.summary" @input="profile.summary = $event" />
	</span>
</template>

<script>
import Input from "../inner/Input.vue"
import TArea from "../inner/TextArea.vue"

export default {
	name: "Profile",
	props: ["profile"],
	components: { Input, TArea },
}
</script>
