"""summary 
    Создайте функцию, которая принимает список словарей и 
    возвращает список словарей, содержащий следующие данные:

"""
def new_func():
    '''#первая строка комментария
#2 Упаковать данные в список словарей
#[{'id': 1, 'item_name': 'Coca-Cola', 'price': '100'}, 
#{'id': 2, 'item_name': 'Pants', 'price': '2000'}]
'''

new_func()

columns = "id", "item_name", "price"
rows = [(1, "Coca-Cola", "100"), (2, "Pants", "2000")]
# dictions = dict(zip(('id', 'item_name'), (1, 'Coca-Cola')))
# print(dictions)
result = []
# i  = len(rows)

for row in rows:
    result.append(dict(zip(columns, row)))

print(result)
