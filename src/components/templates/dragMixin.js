// Data-driven section drag mixin for single-column templates.
// Provides localSectionOrder computed, drag methods, and sectionNum helper.
// Multi-column templates (3, 5, 8) should not bind these drag events on sections.
export default {
  data() {
    return {
      dragSrcSection: null
    }
  },

  computed: {
    localSectionOrder() {
      const defaults = ['exps', 'skills', 'eds', 'projs']
      if (this.data && this.data.sectionOrder && this.data.sectionOrder.length) {
        return this.data.sectionOrder
      }
      return defaults
    }
  },

  methods: {
    // Returns a zero-padded section number for templates that display numeric labels.
    // idx is the 0-based position in localSectionOrder; summary is always "01".
    sectionNum(idx) {
      return String(idx + 2).padStart(2, '0')
    },

    onSectionDragStart(e, section) {
      this.dragSrcSection = section
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text', section)
      e.currentTarget.style.opacity = '0.5'
    },

    onSectionDragOver(e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    },

    onSectionDrop(e, targetSection) {
      e.preventDefault()
      if (this.dragSrcSection && this.dragSrcSection !== targetSection) {
        const order = [...this.localSectionOrder]
        const from = order.indexOf(this.dragSrcSection)
        const to = order.indexOf(targetSection)
        if (from !== -1 && to !== -1) {
          order.splice(from, 1)
          order.splice(to, 0, this.dragSrcSection)
          this.$emit('reorder-sections', order)
        }
      }
      this.dragSrcSection = null
    },

    onSectionDragEnd(e) {
      e.currentTarget.style.opacity = '1'
      this.dragSrcSection = null
    }
  }
}
