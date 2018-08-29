<template>
    <span class="hl-keyword">
      <span v-for="(item, i) in tokens" :class="item.class"
        >{{ item.content }}</span>
    </span>
</template>

<script>
export default {
    name: 'hl-keyword',

    props: {
        value: String,
        kw: String,
    },

    computed: {
        tokens: function() {
            if (!this.kw || !this.value) {
              return []
            }
            const that = this
            const tks = this.value.split(this.kw)
            let res = []
            tks.forEach(function(tk, i) {
                if (tk) {
                    res.push({
                        class: "text",
                        content: tk
                    })
                }
                if (i + 1 !== tks.length) {
                    res.push({
                        class: "keyword",
                        content: that.kw
                    })
                }
            })
            return res
        }
    }
}
</script>

<style scoped>
.keyword {
  color: #dd4b39;
  font-weight: bold;
}
</style>


