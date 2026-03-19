export default {
  methods: {
    setupDrag() {
      if (!this.$el) return
      const rows = this.$el.querySelectorAll('.draggable-element')
      let dragSrcEl = null
      let current = null

      function handleDragStart(e) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', e.target.innerHTML)
        e.dataTransfer.dropEffect = 'move'
        dragSrcEl = e.target
        e.target.style.opacity = '0.5'
      }

      function handleDragOver(e) {
        e.preventDefault()
        if (typeof e.target.closest === 'function') {
          current = e.target.closest('.draggable-element')
        }
      }

      function handleDragEnd(e) {
        e.target.style.opacity = '1'
        if (current && current !== dragSrcEl && current.classList.contains('draggable-element')) {
          const inner = current.innerHTML
          current.innerHTML = dragSrcEl.innerHTML
          dragSrcEl.innerHTML = inner
        }
        current = null
        dragSrcEl = null
      }

      rows.forEach(function (row) {
        // Remove old listeners by cloning
        const clone = row.cloneNode(true)
        row.parentNode.replaceChild(clone, row)
      })

      // Re-query after clone
      const freshRows = this.$el.querySelectorAll('.draggable-element')
      freshRows.forEach(function (row) {
        row.addEventListener('dragstart', handleDragStart, false)
        row.addEventListener('dragover', handleDragOver, false)
        row.addEventListener('dragend', handleDragEnd, false)
      })
    }
  },
  mounted() {
    this.$nextTick(() => this.setupDrag())
  },
  updated() {
    this.$nextTick(() => this.setupDrag())
  }
}
