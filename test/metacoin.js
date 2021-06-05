// テスト用のコード
// MetaCoinコントラクトを読み込んでインスタンス化
const MetaCoin = artifacts.require("MetaCoin");

contract('MetaCoin', (accounts) => {
  // 初期化をチェックするテスト
  it('should put 10000 MetaCoin in the first account', async () => {
    const metaCoinInstance = await MetaCoin.deployed();
    const balance = await metaCoinInstance.getBalance.call(accounts[0]);
    // 初期残高が10000ではない場合にエラー
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
  // 外部コントラクトが読み込めているかチェックするテスト
  it('should call a function that depends on a linked library', async () => {
    const metaCoinInstance = await MetaCoin.deployed();
    // 残高取得
    const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
    // 残高取得
    const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();
    // レートを掛けた値と一致していない場合はエラー
    assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  // 送金処理が問題なく実施されるかチェックするテスト
  it('should send coin correctly', async () => {
    const metaCoinInstance = await MetaCoin.deployed();

    // テスト用のアカウントを用意する。
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // 初期残高を取得する。
    const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

    // 送金額を設定
    const amount = 10;
    // 送金実行
    await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // 送金後の残高を取得する。
    const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

    // 送金額と同じ分だけ残高が変化していなければエラー
    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
