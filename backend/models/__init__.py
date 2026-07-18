import os
import importlib

package_name = __name__

for filename in os.listdir(os.path.dirname(__file__)):
    if filename.endswith(".py") and filename not in ["__init__.py"]:
        module_name = filename[:-3]
        importlib.import_module(f"{package_name}.{module_name}")