def check(Stroka, ch):
     if not Stroka:
         return 0
     elif Stroka[0] == ch:
         return 1 + check(Stroka[1:], ch)
     else: 
         return check(Stroka[1:], ch)


Stroka = "Фаина Фаина"
ch = "Ф"
print("Количество вхождений:")
print(check(Stroka, ch))


# решение в одно строку, используя метод .count
print(Stroka.count(ch))
