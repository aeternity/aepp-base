import { times } from 'lodash-es';
import BigNumber from 'bignumber.js';
import { Crypto } from '@aeternity/aepp-sdk/es';
import { MAGNITUDE } from '../lib/constants';

export const address = 'ak_2swhLkgBPeeADxVTAVCJnZLY5NZtCFiM93JxsEaMuC59euuFRQ';
export const contractAddress = 'ct_2ZkyFFLRwooiSEzZg9BVh43mKZJbxoUHNkEVhT336pM5vVfNQ1';
export const callData = 'cb_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBo8mdjOP9QiDmrpHdJ7/qL6H7yhPIH+z2ZmHAc1TiHxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSgG2A';
export const code = 'cb_+QPvRgGgeN05+tJcdqKtrzpqKaGf7e7wSc3ARZ/hNSgeuHcoXLn5Avv5ASqgaPJnYzj/UIg5q6R3Se/6i+h+8oTyB/s9mZhwHNU4h8WEbWFpbrjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKD//////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+QHLoLnJVvKLMUmp9Zh6pQXz2hsiCcxXOSNABiu2wb2fn5nqhGluaXS4YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////////////////////////////////////7kBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA//////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////////////////////////////////////uMxiAABkYgAAhJGAgIBRf7nJVvKLMUmp9Zh6pQXz2hsiCcxXOSNABiu2wb2fn5nqFGIAAMBXUIBRf2jyZ2M4/1CIOaukd0nv+ovofvKE8gf7PZmYcBzVOIfFFGIAAK9XUGABGVEAW2AAGVlgIAGQgVJgIJADYAOBUpBZYABRWVJgAFJgAPNbYACAUmAA81tZWWAgAZCBUmAgkANgABlZYCABkIFSYCCQA2ADgVKBUpBWW2AgAVFRWVCAkVBQgJBQkFZbUFCCkVBQYgAAjFaqo6ki';
export const amount = BigNumber(Math.random() * 20);
export const fee = BigNumber('2033380').shiftedBy(-MAGNITUDE);
export const minFee = BigNumber('1579000').shiftedBy(-MAGNITUDE);

export const account = {
  balance: BigNumber('14.999999999999813'),
  address,
  name: 'My First Account',
};

export const accounts = times(5, idx => ({
  balance: BigNumber(Math.random() * 20),
  address: Crypto.generateKeyPair().publicKey,
  name: `Test account ${idx}`,
}));

export const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a nunc libero. Aenean aliquet tellus non enim varius, at mattis est rhoncus. Ut dictum mi lacus, sit amet interdum ante convallis ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas volutpat eros ac nisl hendrerit, egestas placerat nunc volutpat. Suspendisse diam massa, ultricies ut neque quis, pulvinar eleifend tortor. Ut efficitur elit odio, sit amet varius felis rutrum eu. Nullam bibendum libero dictum odio porta fermentum. Sed laoreet elit vel erat egestas gravida. Donec tempor venenatis laoreet. Vivamus neque tortor, mattis at laoreet ut, hendrerit non justo. Aenean imperdiet libero eu ex ultrices lacinia. Suspendisse nec neque vitae ante facilisis scelerisque.',
  'Morbi ac mi molestie, viverra tellus sed, imperdiet metus. Aliquam feugiat volutpat urna, in dictum augue vulputate quis. Ut nec dolor sit amet nibh vehicula porttitor vitae vel ligula. Curabitur consequat leo lectus, et varius nibh volutpat a. In sed placerat velit. Quisque fermentum diam ut odio vestibulum commodo. Mauris convallis, dolor gravida maximus pretium, mi turpis sollicitudin risus, et scelerisque neque neque in ante. Nullam egestas nulla in odio aliquam, ac volutpat diam pellentesque. Mauris a lorem ullamcorper dui laoreet cursus a eget est. In vehicula ut erat eu semper. Sed a pellentesque sem. Nam quis dolor quis felis imperdiet congue. Ut mollis felis nec sem sodales scelerisque.',
  'Pellentesque efficitur sagittis tincidunt. Aliquam porta hendrerit semper. Quisque maximus laoreet rutrum. Integer tortor dui, finibus quis rutrum a, aliquet eget mauris. Donec dolor dolor, convallis nec condimentum et, maximus non dui. Praesent euismod tempus nibh sit amet egestas. Nullam vulputate pharetra ante, vel eleifend ligula placerat sed. Nam facilisis vulputate dolor, a auctor nisl.',
  'Curabitur lobortis nulla ex, vel ultrices nisi tempus at. Aliquam erat volutpat. Phasellus congue pretium orci, quis aliquet tellus imperdiet ac. Phasellus et augue tristique, auctor nisi id, porta ante. Nullam sodales velit et arcu pharetra cursus. Donec nec velit a quam varius porttitor. Vivamus accumsan eros vel nunc rhoncus, at sollicitudin velit rhoncus. Ut non ex rutrum, efficitur lectus ut, aliquam justo. Vivamus porttitor arcu metus, vitae feugiat sem cursus a.',
  'Nunc eu orci massa. Suspendisse potenti. Cras feugiat lobortis orci ut tincidunt. Sed suscipit lorem in facilisis gravida. Donec dapibus vel odio at congue. In porttitor nibh nec consectetur mattis. Integer nisl risus, egestas ut rhoncus vitae, dapibus ac turpis.',
];
