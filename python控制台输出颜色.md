## 格式化JSON文件

``` python
$ python -m json.tool input-file.json output-file.json
```

## 在终端中输出带颜色字体

``` python

FOREGROUND_BLUE = 0x09  # blue.
FOREGROUND_GREEN = 0x0a  # green.
FOREGROUND_RED = 0x0c  # red.
FOREGROUND_YELLOW = 0x0e  # yellow.
STD_INPUT_HANDLE = -10
STD_OUTPUT_HANDLE = -1
STD_ERROR_HANDLE = -12
std_out_handle = ctypes.windll.kernel32.GetStdHandle(STD_OUTPUT_HANDLE)

def printRed(mess):
    set_cmd_text_color(FOREGROUND_RED)
    sys.stdout.write(mess + '\n')
    resetColor()

def printGreen(mess):
    set_cmd_text_color(FOREGROUND_GREEN)
    sys.stdout.write(mess + '\n')
    resetColor()


def resetColor():
    set_cmd_text_color(FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE)

def set_cmd_text_color(color, handle=std_out_handle):
    Bool = ctypes.windll.kernel32.SetConsoleTextAttribute(handle, color)
    return Bool

```
