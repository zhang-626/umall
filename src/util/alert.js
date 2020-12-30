import Vue from 'vue';
let vm = new Vue();

export const success = msg => {
    vm.$message({
        type: 'success',
        message: msg
    });
}


export const warning = mag => {
    vm.$message({
        type: 'info',
        message: mag
    });
};


