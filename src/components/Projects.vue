<template>
  <div class="accordion" style="text-align: justify">
    <div class="card">
      <div
        class="card-header border-success bg-transparent"
        :id="'headingproj' + this.$vnode.key"
        data-bs-toggle="collapse"
        :data-bs-target="'#collapseproj' + this.$vnode.key"
        :aria-expanded="this.$vnode.key > 0 ? false : true"
        :aria-controls="'collapseproj' + this.$vnode.key"
      >
        <h3>
          {{proj.title?"Project: "+proj.title:"Project"}}
          <button
            class="btn float-end"
            style="color: red; padding: 0px 8px"
            @click="$emit('delete-row')"
          >
            &ndash;
          </button>
        </h3>
      </div>
      <div
        :id="'collapseproj' + this.$vnode.key"
        :class="[{ collapse: true }, { show: this.$vnode.key == 0 }]"
        :aria-labelledby="'headingproj' + this.$vnode.key"
        data-bs-parent="#projects"
      >
        <div class="card-body">
          <div class="form-group">
            <label for="title" class="col-md-3 col-form-label">Title</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="proj.title"
                placeholder="Project Title"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="desc" class="col-md-3 col-form-label"
              >Description</label
            >
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="proj.desc"
                placeholder="Description"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="link" class="col-md-3 col-form-label">Link</label>
            <div class="col">
              <input
                type="url"
                class="form-control"
                v-model="proj.link"
                placeholder="Link"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="start" class="col-md-3 col-form-label">Start</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="proj.start"
                placeholder="Jan 2020"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="end" class="col-md-3 col-form-label">End</label>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="proj.end"
                placeholder="Dec 2020"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="end" class="col-md-6 col-form-label">
              Tools &amp; Technologies
            </label>
            <button @click="add('tool')" class="col-md-1 btn btn-secondary">
              +
            </button>
            <div
              class="col mt-3 input-group"
              v-for="(res, i) in proj.tools"
              :key="i"
            >
              <input
                type="text"
                class="form-control"
                v-model="proj.tools[i]"
                placeholder="Tool"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  id="button-addon2"
                  title="Delete tool"
                  @click="$emit('del-joined', i)"
                >
                  &ndash;
                </button>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="end" class="col-md-6 col-form-label">
              Responsibilities
            </label>
            <button @click="add('resp')" class="col-md-1 btn btn-secondary">
              +
            </button>
            <div class="col mt-3 input-group" v-for="(res, i) in proj.resp" :key="i">
              <input
                type="text"
                class="form-control"
                v-model="proj.resp[i]"
                placeholder="Responsibility"
              />
              <div class="input-group-append">
                    <button class="btn btn-outline-danger" type="button" id="button-addon2" title="Delete Responsibility" @click="$emit('del-resp',i)">&ndash;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "Projects",
  methods: {
    add: function (type) {
      switch (type) {
        case "resp":
          this.proj.resp.push("");
          break;
        case "tool":
          this.proj.tools.push("");
          break;

        default:
          break;
      }
    },
  },
  props: ["proj"],
};
</script>
