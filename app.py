from flask import Flask, render_template, request, redirect

app = Flask(__name__, static_folder='static')

accounts = []


class BalanceException(Exception):
    pass


class BankAccount:
    def __init__(self, initialBalance, accName):
        self.balance = initialBalance
        self.name = accName
        print(f"\nAccount '{self.name}' created. \nBalance of ${self.balance:.2f}")

    def getBalance(self):
        print(f"\nAccount '{self.name}' balance: ${self.balance:.2f}")

    def deposit(self, amount):
        self.balance = self.balance + amount
        print(f"\nDeposit Complete. "
              f"\nAccount '{self.name}' "
              f"\nBalance: ${self.balance:.2f}")
        self.getBalance()

    def viableTransaction(self, amount):
        if self.balance >= amount:
            return
        else:
            raise BalanceException(
                f"\nSorry, account '{self.name}' only has a balance of ${self.balance:.2f}. "
            )

    def withdraw(self, amount):
        try:
            self.viableTransaction(amount)
            self.balance = self.balance - amount
            print("\nWithdrawal Complete. ")
            self.getBalance()
        except BalanceException as error:
            print(f'\nWithdrawal Failed. {error}')

    def transfer(self, amount, account):
        try:
            print('\n ******************************************\n\n '
                  'Beginnig Transfer..🎉 ')
            self.viableTransaction(amount)
            self.withdraw(amount)
            account.deposit(amount)
            print('\n ******************************************\n\n '
                  'Transfer Complete. 🛫')
        except BalanceException as error:
            print(f'\nTransfer Failed. {error}')


class InterestRewardsAcct(BankAccount):
    def deposit(self, amount):
        self.balance = self.balance + (amount * 1.05)
        print(f"\nDeposit Complete. ")
        self.getBalance()


class SavingsAcct(InterestRewardsAcct):
    def __init__(self, initialBalance, accName):
        super().__init__(initialBalance, accName)
        self.fee = 5

    def withdraw(self, amount):
        try:
            self.viableTransaction(amount + self.fee)
            self.balance = self.balance - (amount + self.fee)
            print("\nWithdrawal Complete. ")
            self.getBalance()

        except BalanceException as error:
            print(f'\nWithdrawal Failed: {error}')


@app.route('/')
def index():
    return render_template('index.html', accounts=accounts)


@app.route('/create_account', methods=['POST'])
def create_account():
    name = request.form['name']
    initial_balance = float(request.form['initial_balance'])
    new_account = BankAccount(initial_balance, name)
    accounts.append(new_account)
    return redirect('/')


@app.route('/transfer', methods=['POST'])
def transfer():
    sender_name = request.form['sender']
    recipient_name = request.form['recipient']
    amount = float(request.form['amount'])

    sender_account = next((acc for acc in accounts if acc.name == sender_name), None)
    recipient_account = next((acc for acc in accounts if acc.name == recipient_name), None)

    if sender_account and recipient_account:
        try:
            sender_account.transfer(amount, recipient_account)
        except BalanceException as error:
            return str(error)
    else:
        return 'Invalid sender or recipient account.'

    return redirect('/')


@app.route('/deposit', methods=['POST'])
def deposit():
    name = request.form['account']
    amount = float(request.form['amount'])

    account = next((acc for acc in accounts if acc.name == name), None)

    if account:
        account.deposit(amount)
    else:
        return 'Invalid account.'

    return redirect('/')


@app.route('/withdraw', methods=['POST'])
def withdraw():
    name = request.form['account']
    amount = float(request.form['amount'])

    account = next((acc for acc in accounts if acc.name == name), None)

    if account:
        account.withdraw(amount)
    else:
        return 'Invalid account.'

    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
