def find_search_unic(arrays):
    spisok_unic = [elem for arr in arrays for elem in arr] #генератор списка, который пройдет по всем массивам arr в arrays и 
    # добавит каждый элемент elem из массивов в список

    unique_elems = set(spisok_unic) #set преобразует список в множество, 
    # чтобы получить уникальные элементы.

    find_search_unic = [elem for elem in unique_elems if all(elem in arr for arr in arrays)]

    
    return find_search_unic
    
# Пример использования
#input_arrays = [[1, 2, 4, 6], [3, 5, 3, 4], [2, 3, 4, 5, 6]]
#result = find_search_unic(input_arrays)
#print(result)

arrays1 = [1, 2, 4, 6]  #список
arrays2 = [3, 5, 3, 4]  #список
arrays3 = [2, 3, 4, 5, 6]   #список

input_arrays = [] # список
input_arrays.append(arrays1) #В список input_arrays добавляется список arrays1 методом append
input_arrays.append(arrays2)
input_arrays.append(arrays3)

result = find_search_unic(input_arrays)
print(result)
