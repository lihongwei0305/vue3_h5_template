let com = import.meta.globEager('./global/**/index.vue')


const installComponents = (app) => {
    Object.keys(com).forEach(k => {
        let comConfig = com[k]
        let name = k.split('/')[2]
        let def = comConfig['default'] || comConfig
        app.component(name, def)
    })
}

export default installComponents

