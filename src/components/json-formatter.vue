<template>
  <div id="json-formatter">
    <h1 class="page-header">JSON编辑器
      <share-button :params="share_params"></share-button>
    </h1>

    <div class="toolbar">
      <div class="tool">
        <el-button @click="on_copy" :value="text" type="primary">复制</el-button>
      </div>

      <div class="tool">
        <el-button @click="on_save" type="primary">保存</el-button>
      </div>

      <div class="tool">
        <el-button @click="on_validate" type="primary">校验</el-button>
      </div>

      <div class="tool indent">
        <label>缩进:</label>
        <input v-model.number="indent" type="number" @change="update_indent" class="custom-input"></input>
      </div>
    </div>

    <div id="editors">
      <div id="code-editor" class="editor">
      </div>
      <div id="tree-editor" class="editor">
      </div>
      <div class="splitter flex-center">
        <div>
          <el-button class="btn" icon="d-arrow-right" @click="code_2_tree"></el-button>
        </div>
        <div>
          <el-button class="btn" icon="d-arrow-left" @click="tree_2_code"></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor'
import ShareButton from './share-button.vue'
import CopyButton from './copy-button.vue'
import clipboard from '../util/clipboard.js'
import util from '../util'

export default {
  name: 'json_formatter',

  components: {
    ShareButton,
    CopyButton,
  },

  data () {
    var params = util.qstr_2_obj();

    return {
      text: params.text ? params.text : '',
      indent: util.parse_num(params.indent, 2),
      code_editor: null,
      tree_editor: null,
      editor_height: 0,
    }
  },

  computed: {
    share_params: function() {
      return {
      };
    },
  },

  methods: {
    mount_code_editor: function() {
      var vm = this;
      var container = document.getElementById("code-editor");
      var options = {
        mode: 'code',
        onError: function(error) {
          vm.show_error(error);
        },
      };
      this.code_editor = new JSONEditor(container, options);
      this.code_editor.setText(this.text);
    },

    mount_tree_editor: function() {
      var container = document.getElementById("tree-editor");
      var options = {
        mode: 'tree'
      };
      this.tree_editor = new JSONEditor(container, options);
      if (this.text) {
        this.code_2_tree();
      }
    },

    update_indent: function() {
      this.code_editor.indentation = Array(this.indent).join(' ');
      this.format_code();
    },

    format_code: function() {
      try {
        this.code_editor.set(this.code_editor.get());
      }
      catch (err) {
        this.show_error(err);
      }
    },

    show_error: function(error) {
      const pre = this.$createElement;
      this.$notify.error({
        title: 'JSON格式错误',
        message: String(error),
        message: pre('pre', {}, String(error)),
        customClass: 'auto-width-notice code notice',
        duration: 0
      });
    },

    code_2_tree: function() {
      try {
        this.tree_editor.set(this.code_editor.get());
      }
      catch (err) {
        this.show_error(err);
      }
    },

    tree_2_code: function() {
      this.code_editor.set(this.tree_editor.get());
    },

    on_validate: function() {
      try {
        this.code_editor.get();
        this.$notify.success('JSON格式正确');
      }
      catch (err) {
        this.show_error(err);
      }
    },

    on_copy: function() {
      var text = this.code_editor.getText();
      if(clipboard.copy(text)) {
        this.$message.success('复制成功');
      }
      else {
        this.$message.error('复制失败');
      }
    },

    on_save: function() {
      var text = this.code_editor.getText();
      util.download_text('data.json', text);
    },
  },

  mounted: function() {
    this.mount_code_editor();
    this.mount_tree_editor();
  },

  created: function() {
  },
}
</script>

<style lang="less" scoped>
@import "~jsoneditor/dist/jsoneditor.min.css";

#json-formatter {
  padding: 10px;
  min-height: 100%;
}

#editors {
  height: 80vh;
}

.toolbar {
  margin-bottom: 10px;
}

.toolbar .tool {
  display: inline;
  margin-right: 10px;
}

.tool.indent input {
  width: 2em;
}

.editor {
  width: ~"calc((100% - 70px) / 2)";
  height: 100%;
}

#code-editor {
  float: left;
}

#tree-editor {
  float: right;
}

.splitter {;
  margin: 0 auto;
  width: 70px;
  height: 100%;
}

.flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
}

.splitter div {
  text-align: center;
}

.splitter div+div {
  margin-top: 40px;
}

.notice pre {
  line-height: .8em;
}
</style>
