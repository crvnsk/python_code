# Есть массив, надо найти уникальный элемент, которые не повторяется

def unique(arr):
    res = []
    for item in arr:
        if arr.count(item) == 1:
            res.append(item)
    return res

arr = [1, 2, 3, 2, 4, 4, 3, 5, 1, 6] # -> [5, 6]
unique_arr = unique(arr)
print(unique_arr)



