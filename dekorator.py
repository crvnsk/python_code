def uppercase_decorator(function):
    def wrapper():
        func = function()
        make_uppercase = func.upper()
        return make_uppercase
    return wrapper

@uppercase_decorator
def say_hello():
    return 'hello!'

print(say_hello())
# Здесь мы создали декоратор uppercase_decorator, который принимает функцию function в качестве аргумента и возвращает функцию wrapper. 
# Функция wrapper вызывает переданную ей функцию function, преобразует ее результат к верхнему регистру и возвращает измененный результат.
# Затем мы использовали декоратор uppercase_decorator для декорирования функции say_hello(), добавляя к ней новую функциональность,
# т.е. преобразование результата в верхний регистр.
# В результате выполнения программы мы получим строку "HELLO!", которая была создана в результате выполнения функции say_hello() с применением декоратора.