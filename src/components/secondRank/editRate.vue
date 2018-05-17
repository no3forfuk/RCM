<template>
    <div>
        <div class="modal fade" id="editRate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">评级规则管理</h4>
                    </div>
                    <div class="modal-body container">
                        <div>
                            <button class="btn-default btn">S+</button>
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%----
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%
                        </div>
                        <div>
                            <button class="btn-default btn">S</button>
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%----
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%
                        </div>
                        <div>
                            <button class="btn-default btn">A+</button>
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%----
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%
                        </div>
                        <div>
                            <button class="btn-default btn">A</button>
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%----
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%
                        </div>
                        <div>
                            <button class="btn-default btn">B+</button>
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%----
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%
                        </div>
                        <div>
                            <button class="btn-default btn">B</button>
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%----
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%
                        </div>
                        <div>
                            <button class="btn-default btn">C+</button>
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%----
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%
                        </div>
                        <div>
                            <button class="btn-default btn">C</button>
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%----
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%
                        </div>
                        <div>
                            <button class="btn-default btn">D+</button>
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%----
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%
                        </div>
                        <div>
                            <button class="btn-default btn">D</button>
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%----
                            <input type="number" style="width: 50px;" max="100" min="0" step="5">%
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" >保存</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        }
    }

</script>

<style scoped>
    .container > div > button {
        width: 50px;
    }

    .container > div {
        padding: 5px;
    }
</style>