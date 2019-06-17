
const { wait, inspect } = require("./utils");

const config = (ct, accounts, anchors = ["sadad", "tosan"]) => {
    const addAnchor = (owner) => (chain, name, index) =>
        chain.then(() => ct.addNewAnchor(name, `http://${name}.test`, [accounts[(index * 2) + 1], accounts[(index * 2) + 2]], {
            from: owner
        }))

    return Promise.resolve()
        .then(() => ct.owner())
        .then((owner) => anchors.reduce(addAnchor(owner), Promise.resolve()))
        .then(() => ct.owner())
        .then((owner) => (ct.renounceOwnership({
            from: owner.toString()
        })));
}

const getContract = (Contract, accounts) => {
    return Contract.new(50, { from: accounts[0] })
        .then((ct) => config(ct, accounts).then(() => ct))
}

module.exports = { config, getContract }