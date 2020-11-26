const assert = require ('assert');              // утверждения
const ganache = require ('ganache-cli');        // тестовая сеть
const Web3 = require ('web3');                  // библиотека для подключения к ефириуму
const decimals = 10**8;
require('events').EventEmitter.defaultMaxListeners = 0;

const compiledContract = require('../build/contracts/Factory.json');


let contract;
let accounts;
let contractAddress;
console.log(Date());


describe('Серия тестов для проверки базовых функций  ...', () => {
    let web3 = new Web3(ganache.provider());      // настройка провайдера

    it('Разворачиваем контракт для тестирования...', async () => {

        accounts = await web3.eth.getAccounts();
//console.log(accounts[0]);
//console.log('ABI: ', compiledContract.abi)
//console.log('BYTECODE: ', compiledContract.bytecode)

        contract = await new web3.eth.Contract(compiledContract.abi)
        .deploy({ data: compiledContract.bytecode })
        .send({ from: accounts[0], gas: '6400000'});
        });

        it('Адрес контракта...', async () => {
        contractAddress = (await contract.options.address);
        //console.log(contractAddress)
        });


});   

