import wx
import os
import wx.xrc
import csv
import datetime
import wx.grid
import matplotlib.pyplot as plt
from matplotlib.backends.backend_wxagg import FigureCanvasWxAgg as FigureCanvas
from matplotlib.figure import Figure


class MainPage(wx.Frame):
    def __init__(self, parent, title="Sample Page", size=(1000, 800)):
        super(MainPage, self).__init__(parent, title=title, size=size)
        self.grid_exists = False
        self.active_panel = None

        self.panel = wx.Panel(self)

        self.panel.SetBackgroundColour(wx.Colour(0, 0, 128))

        # Title of the page
        self.title_label = wx.StaticText(self.panel, label="Victoria State Accident Dataset", pos=(300, 10))
        self.title_font = wx.Font(24, wx.FONTFAMILY_DECORATIVE, wx.FONTSTYLE_NORMAL, wx.FONTWEIGHT_BOLD)
        self.title_label.SetFont(self.title_font)
        self.title_label.SetForegroundColour(wx.Colour(255, 255, 255))

        # Section contains buttons displayed as a navigation bar
        # Buttons are binded to on_button_click function
        self.nav = wx.Panel(self.panel, pos=(10, 60), size=(1000, 30))

        self.btnAccident = wx.Button(self.nav, label="Accident", pos=(100, 0), size=(150, 20))
        self.btnAccident.Bind(wx.EVT_BUTTON, self.on_button_click)

        self.btnAccidentFrequency = wx.Button(self.nav, label="Accident Frequency", pos=(250, 0), size=(150, 20))
        self.btnAccidentFrequency.Bind(wx.EVT_BUTTON, self.on_button_click)

        self.btnAccidentTypes = wx.Button(self.nav, label="Accident Types", pos=(400, 0), size=(150, 20))
        self.btnAccidentTypes.Bind(wx.EVT_BUTTON, self.on_button_click)

        self.btnAlcohol = wx.Button(self.nav, label="Alcohol", pos=(550, 0), size=(150, 20))
        self.btnAlcohol.Bind(wx.EVT_BUTTON, self.on_button_click)

        self.btnFrequencyTypes = wx.Button(self.nav, label="Frequency of Accident Types", pos=(700, 0), size=(170, 20))
        self.btnFrequencyTypes.Bind(wx.EVT_BUTTON, self.on_button_click)

        self.Centre()

        # Setting and hiding the grid
        self.grid = wx.grid.Grid(self.panel, pos=(150, 150), size=(700, 500))  # Adjusted size
        self.grid.Hide()
        self.fig = Figure(figsize=(7, 5), dpi=100)
        self.canvas = FigureCanvas(self.panel, -1, self.fig)
        self.canvas.SetPosition((150, 150))
        self.canvas.Hide()

    # Retrieves button label
    def on_button_click(self, event):
        label = event.GetEventObject().GetLabel()
        self.switch_page(label)

    # Hides previous page's components and displays selected view
    def switch_page(self, new_title):
        if self.active_panel:
            if hasattr(self, 'start_date_label'):
                self.start_date_label.Hide()
            if hasattr(self, 'end_date_label'):
                self.end_date_label.Hide()
            if hasattr(self, 'start_date_dropdown'):
                self.start_date_dropdown.Hide()
            if hasattr(self, 'end_date_dropdown'):
                self.end_date_dropdown.Hide()
            if hasattr(self, 'retrieve_data_btn'):
                self.retrieve_data_btn.Hide()
            if hasattr(self, 'hour_label'):
                self.hour_label.Hide()
            if hasattr(self, 'hour_dropdown'):
                self.hour_dropdown.Hide()
            if hasattr(self, 'accident_type_label'):
                self.accident_type_label.Hide()
            if hasattr(self, 'accident_type_dropdown'):
                self.accident_type_dropdown.Hide()
            if hasattr(self, 'create_frequency_chart_btn'):
                self.create_frequency_chart_btn.Hide()
            if hasattr(self, 'create_type_chart_btn'):
                self.create_type_chart_btn.Hide()
            if hasattr(self, 'create_alcohol_chart_btn'):
                self.create_alcohol_chart_btn.Hide()
            if hasattr(self, 'create_btn'):
                self.create_btn.Hide()
            self.canvas.Hide()
            self.grid.Hide()
            self.active_panel.Destroy()

        if new_title == "Accident":
            self.show_Accident()
        elif new_title == "Accident Frequency":
            self.show_AccidentFrequency()
        elif new_title == "Accident Types":
            self.show_AccidentTypes()
        elif new_title == "Alcohol":
            self.show_Alcohol()
        elif new_title == "Frequency of Accident Types":
            self.show_FrequencyTypes()

# Creates a chart that displays number of accidents in a particular hour for a selected time period
    def create_frequency_chart(self, event):
        self.hide_trend_components()
        self.canvas.Refresh()

        self.fig.clear()

        hour = self.hour_dropdown.GetString(self.hour_dropdown.GetSelection())

        selected_start_date = self.start_date_dropdown.GetString(self.start_date_dropdown.GetSelection())
        selected_end_date = self.end_date_dropdown.GetString(self.end_date_dropdown.GetSelection())

        start_date = int(selected_start_date.split('/')[1] + selected_start_date.split('/')[0])
        end_date = int(selected_end_date.split('/')[1] + selected_end_date.split('/')[0])

        selected_data = []


        with open("victoria_accident.csv", "r") as file:
            reader = csv.reader(file)
            headers = next(reader)

            for row in reader:
                hour_value = row[5].split('.')[0]
                date_parts = row[4].split('/')

                date_value = int(date_parts[2] + date_parts[1])

                if hour_value == hour and start_date <= date_value <= end_date:
                    selected_data.append(row)

        if not selected_data:
            wx.MessageBox(f"No data found for the date range.", "Select Different Date or Dates",
                          wx.OK | wx.ICON_INFORMATION)
            return

        date_hour = {}

        for row in selected_data:

            date = row[4]
            hour = row[5].split('.')[0]

            key = date

            if key in date_hour:
                date_hour[key] += 1
            else:
                date_hour[key] = 1

        sorted_dates = sorted(date_hour.keys(), key=lambda x: (int(x.split('/')[2]), int(x.split('/')[1]), int(x.split('/')[0])))
        sorted_values = [date_hour[date] for date in sorted_dates]
        ax = self.fig.add_subplot(111)

        ax.bar(sorted_dates, sorted_values)
        ax.set_title(f"Trend for Accidents on Hourly Basis: {hour}")
        ax.set_xlabel("Date")
        ax.set_ylabel("Accident Count")

        ax.set_xticks(range(len(sorted_dates)))
        ax.set_xticklabels(sorted_dates, rotation=45)

        self.fig.tight_layout()
        self.canvas.Show()
        self.canvas.draw()

        self.panel.Layout()

# Shows the trend of accidents during alcohol time for a specified time period
    def create_alcohol_chart(self, event):

        self.hide_trend_components()
        self.fig.clear()

        selected_start_date = self.start_date_dropdown.GetString(self.start_date_dropdown.GetSelection())
        selected_end_date = self.end_date_dropdown.GetString(self.end_date_dropdown.GetSelection())

        start_date = int(selected_start_date.split('/')[1] + selected_start_date.split('/')[0])
        end_date = int(selected_end_date.split('/')[1] + selected_end_date.split('/')[0])


        selected_data = []

        with open("victoria_accident.csv", "r") as file:
            reader = csv.reader(file)
            headers = next(reader)

            for row in reader:
                date_parts = row[4].split('/')

                date_value = int(date_parts[2] + date_parts[1])

                if row[6] == 'Yes' and start_date <= date_value <= end_date:
                    selected_data.append(row)

        if not selected_data:
            wx.MessageBox(f"No data found for Alcohol related accidents.",
                          "Select Different Parameters", wx.OK | wx.ICON_INFORMATION)
            return

        date_counts = {}

        for row in selected_data:
            date = row[4]
            if date in date_counts:
                date_counts[date] += 1
            else:
                date_counts[date] = 1

        sorted_dates = sorted(date_counts.keys(), key=lambda x: (datetime.datetime.strptime(x, "%d/%m/%Y").year, datetime.datetime.strptime(x, "%d/%m/%Y").month))  # Sorting by year first, then month
        sorted_values = [date_counts[date] for date in sorted_dates]
        ax = self.fig.add_subplot(111)
        ax.bar(sorted_dates, sorted_values, color='green', alpha=0.7)

        ax.set_title(f"Trend for Accidents during Alcohol Time")
        ax.set_xlabel("Date")
        ax.set_ylabel("Count")

        ax.set_xticks(range(len(sorted_dates)))  # Set x-axis ticks to numeric positions
        ax.set_xticklabels(sorted_dates, rotation=45, fontsize=8)

        self.fig.tight_layout()
        self.canvas.Show()
        self.canvas.draw()

        self.panel.Layout()

    # Shows the count of accident types for a specified time period

    def create_type_chart(self, events):

        self.hide_trend_components()
        self.fig.clear()

        selected_start_date = self.start_date_dropdown.GetString(self.start_date_dropdown.GetSelection())
        selected_end_date = self.end_date_dropdown.GetString(self.end_date_dropdown.GetSelection())

        start_date = int(selected_start_date.split('/')[1] + selected_start_date.split('/')[0])
        end_date = int(selected_end_date.split('/')[1] + selected_end_date.split('/')[0])


        selected_data = []

        with open("victoria_accident.csv", "r") as file:
            reader = csv.reader(file)
            headers = next(reader)

            for row in reader:
                date_parts = row[4].split('/')

                date_value = int(date_parts[2] + date_parts[1])

                if start_date <= date_value <= end_date:
                    selected_data.append(row)

        if not selected_data:
            wx.MessageBox(f"No data found for Alcohol related accidents.",
                          "Select Different Parameters", wx.OK | wx.ICON_INFORMATION)
            return

        type_counts = {}

        for row in selected_data:
            type = row[7]
            if type in type_counts:
                type_counts[type] += 1
            else:
                type_counts[type] = 1

        types = list(type_counts.keys())
        values = [type_counts[type] for type in types]

        ax = self.fig.add_subplot(111)
        ax.bar(types, values, color='red', alpha=0.7)

        ax.set_title(f"Trend for Accident Types Over Time")
        ax.set_xlabel("Accident Types")
        ax.set_ylabel("Value")

        ax.set_xticks(types)
        ax.set_xticklabels(types, rotation=90, fontsize=5)

        self.fig.tight_layout()
        self.canvas.Show()
        self.canvas.draw()

        self.panel.Layout()

    # Hides components of pages which will be used before displaying page contents
    def hide_trend_components(self):

            if hasattr(self, 'start_date_label'):
                self.start_date_label.Hide()
            if hasattr(self, 'end_date_label'):
                self.end_date_label.Hide()
            if hasattr(self, 'start_date_dropdown'):
                self.start_date_dropdown.Hide()
            if hasattr(self, 'end_date_dropdown'):
                self.end_date_dropdown.Hide()
            if hasattr(self, 'retrieve_data_btn'):
                self.retrieve_data_btn.Hide()
            if hasattr(self, 'hour_label'):
                self.hour_label.Hide()
            if hasattr(self, 'hour_dropdown'):
                self.hour_dropdown.Hide()
            if hasattr(self, 'accident_type_label'):
                self.accident_type_label.Hide()
            if hasattr(self, 'accident_type_dropdown'):
                self.accident_type_dropdown.Hide()
            if hasattr(self, 'create_frequency_chart_btn'):
                self.create_frequency_chart_btn.Hide()
            if hasattr(self, 'create_type_chart_btn'):
                self.create_type_chart_btn.Hide()
            if hasattr(self, 'create_alcohol_chart_btn'):
                self.create_alcohol_chart_btn.Hide()
            if hasattr(self, 'create_btn'):
                self.create_btn.Hide()

    # adjusts size of grid base on the number of rows and columns
    def modify_grid(self, rows, columns):
        self.hide_trend_components()
        if not hasattr(self, "grid_exists"):
            self.grid_exists = False

        if not self.grid_exists:
            self.grid.CreateGrid(rows, columns)
            self.grid_exists = True
        else:
            if self.grid.GetNumberRows() > 0:
                self.grid.DeleteRows(0, self.grid.GetNumberRows())
            if self.grid.GetNumberCols() > 0:
                self.grid.DeleteCols(0, self.grid.GetNumberCols())

            self.grid.AppendRows(rows)
            self.grid.AppendCols(columns)

    # covers contents of Accidents
    def show_Accident(self):

        self.active_panel = wx.Panel(self.panel)
        self.hide_trend_components()
        self.title_label.SetLabel("Accidents")

        self.start_date_label = wx.StaticText(self.panel, label="From:", pos=(250, 120))
        self.end_date_label = wx.StaticText(self.panel, label="Till:", pos=(460, 120))

        file_name = "victoria_accident.csv"

        if os.path.exists(file_name):
            with open(file_name, "r") as file:
                reader = csv.reader(file)
                next(reader)
                dates = []

                for row in reader:
                    date = row[4]  # Assuming date is in the 5th column (0-based index)
                    date_components = date.split('/')
                    if len(date_components) == 3:
                        formatted_date = f"{date_components[1]}/{date_components[2]}"
                        if formatted_date not in dates:
                            dates.append(formatted_date)

                dates.sort(key=lambda x: (int(x.split('/')[1]), int(x.split('/')[0])))


        self.start_date_dropdown = wx.Choice(self.panel, pos=(310, 115), choices=dates)
        self.end_date_dropdown = wx.Choice(self.panel, pos=(490, 115), choices=dates)

        self.retrieve_data_btn = wx.Button(self.panel, label="Retrieve", pos=(570, 115),
                                                     size=(150, 20))
        self.retrieve_data_btn.Bind(wx.EVT_BUTTON, self.retrieve_data)

    # covers contents of Alcohol related accidents
    def show_Alcohol(self):
        self.active_panel = wx.Panel(self.panel)
        self.hide_trend_components()

        self.title_label.SetLabel("Accidents during Alcohol Time")

        self.start_date_label = wx.StaticText(self.panel, label="From: ", pos=(250, 120))
        self.end_date_label = wx.StaticText(self.panel, label="Till: ", pos=(460, 120))

        file_name = "victoria_accident.csv"

        if os.path.exists(file_name):
            with open(file_name, "r") as file:
                reader = csv.reader(file)
                next(reader)
                dates = []

                for row in reader:
                    date = row[4]
                    date_components = date.split('/')
                    if len(date_components) == 3:
                        formatted_date = f"{date_components[1]}/{date_components[2]}"
                        if formatted_date not in dates:
                            dates.append(formatted_date)

                dates.sort(key=lambda x: (int(x.split('/')[1]), int(x.split('/')[0])))

        self.start_date_dropdown = wx.Choice(self.panel, pos=(310, 115), choices=dates)
        self.end_date_dropdown = wx.Choice(self.panel, pos=(490, 115), choices=dates)

        self.create_alcohol_chart_btn = wx.Button(self.panel, label="Create", pos=(570, 115),
                                                     size=(150, 25))
        self.create_alcohol_chart_btn.Bind(wx.EVT_BUTTON, self.create_alcohol_chart)
        self.panel.Layout()

    # covers contents of accident types in a specified time period
    def show_FrequencyTypes(self):
        self.active_panel = wx.Panel(self.panel)
        self.hide_trend_components()

        self.title_label.SetLabel("Accident Types over a Time Period")

        self.start_date_label = wx.StaticText(self.panel, label="From: ", pos=(230, 120))
        self.end_date_label = wx.StaticText(self.panel, label="Till: ", pos=(410, 120))

        file_name = "victoria_accident.csv"

        if os.path.exists(file_name):
            with open(file_name, "r") as file:
                reader = csv.reader(file)
                next(reader)
                dates = []

                for row in reader:
                    date = row[4]
                    date_components = date.split('/')
                    if len(date_components) == 3:
                        formatted_date = f"{date_components[1]}/{date_components[2]}"
                        if formatted_date not in dates:
                            dates.append(formatted_date)

                dates.sort(key=lambda x: (int(x.split('/')[1]), int(x.split('/')[0])))

        self.start_date_dropdown = wx.Choice(self.panel, pos=(310, 115), choices=dates)
        self.end_date_dropdown = wx.Choice(self.panel, pos=(490, 115), choices=dates)

        self.create_type_chart_btn = wx.Button(self.panel, label="Create", pos=(570, 115),
                                                         size=(150, 24))
        self.create_type_chart_btn.Bind(wx.EVT_BUTTON, self.create_type_chart)
        self.panel.Layout()

    # covers content of accident by hour
    def show_AccidentFrequency(self):
        self.active_panel = wx.Panel(self.panel)
        self.hide_trend_components()

        self.title_label.SetLabel("Accidents by Hour on a Time Period")

        self.start_date_label = wx.StaticText(self.panel, label="From:", pos=(320, 120))
        self.end_date_label = wx.StaticText(self.panel, label="Till:", pos=(460, 120))

        file_name = "victoria_accident.csv"

        if os.path.exists(file_name):
            with open(file_name, "r") as file:
                reader = csv.reader(file)
                next(reader)
                dates = []

                for row in reader:
                    date = row[4]
                    date_components = date.split('/')
                    if len(date_components) == 3:
                        formatted_date = f"{date_components[1]}/{date_components[2]}"
                        if formatted_date not in dates:
                            dates.append(formatted_date)

                dates.sort(key=lambda x: (int(x.split('/')[1]), int(x.split('/')[0])))

        self.start_date_dropdown = wx.Choice(self.panel, pos=(360, 115), choices=dates)
        self.end_date_dropdown = wx.Choice(self.panel, pos=(490, 115), choices=dates)

        self.hour_label = wx.StaticText(self.panel, label="Hour of the Day:", pos=(140, 120))
        self.hour_dropdown = wx.Choice(self.panel, pos=(250, 115), choices=['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'])

        self.create_frequency_chart_btn = wx.Button(self.panel, label="Create", pos=(570, 115), size=(150, 25))
        self.create_frequency_chart_btn.Bind(wx.EVT_BUTTON, self.create_frequency_chart)
        self.panel.Layout()

    # covers the content of accident by type
    def show_AccidentTypes(self):
        self.active_panel = wx.Panel(self.panel)

        self.hide_trend_components()


        self.title_label.SetLabel("Accident Types")

        self.start_date_label = wx.StaticText(self.panel, label="From:", pos=(440, 120))
        self.end_date_label = wx.StaticText(self.panel, label="Till:", pos=(570, 120))

        file_name = "victoria_accident.csv"

        if os.path.exists(file_name):
            with open(file_name, "r") as file:
                reader = csv.reader(file)
                next(reader)
                dates = []

                for row in reader:
                    date = row[4]
                    date_components = date.split('/')
                    if len(date_components) == 3:
                        formatted_date = f"{date_components[1]}/{date_components[2]}"
                        if formatted_date not in dates:
                            dates.append(formatted_date)

                dates.sort(key=lambda x: (int(x.split('/')[1]), int(x.split('/')[0])))

        self.start_date_dropdown = wx.Choice(self.panel, pos=(480, 115), choices=dates)
        self.end_date_dropdown = wx.Choice(self.panel, pos=(600, 115), choices=dates)

        self.accident_type_label = wx.StaticText(self.panel, label="Accident Type:", pos=(130, 120))
        self.accident_type_dropdown = wx.Choice(self.panel, pos=(220, 115), choices=['Struck Pedestrian', 'Collision with vehicle', 'Collision with a fixed object', 'No collision and no object struck', 'Struck animal', 'Vehicle overturned (no collision)', 'collision with some other object', 'Fall from or in moving vehicle', 'Other accident'])

        self.create_btn = wx.Button(self.panel, label="Retrieve", pos=(680, 115), size=(150, 24))
        self.create_btn.Bind(wx.EVT_BUTTON, self.retrieve_accident_types)

        self.grid.SetPosition((230, 120))
        self.panel.Layout()

    # retrieves data for the accident page
    def retrieve_data(self, event):

        selected_start_date = self.start_date_dropdown.GetString(self.start_date_dropdown.GetSelection())
        selected_end_date = self.end_date_dropdown.GetString(self.end_date_dropdown.GetSelection())

        start_date = int(selected_start_date.split('/')[1] + selected_start_date.split('/')[0])
        end_date = int(selected_end_date.split('/')[1] + selected_end_date.split('/')[0])

        selected_data = []

        with open("victoria_accident.csv", "r") as file:
            reader = csv.reader(file)
            headers = next(reader)

            for row in reader:

                date_parts = row[4].split('/')

                date_value = int(date_parts[2] + date_parts[1])

                if start_date <= date_value <= end_date:
                    selected_data.append(row)

        selected_data.sort(
            key=lambda x: datetime.date(int(x[4].split('/')[2]), int(x[4].split('/')[1]), int(x[4].split('/')[0])))

        self.modify_grid(len(selected_data), len(headers))
        for col_num, header in enumerate(headers):
            self.grid.SetColLabelValue(col_num, header)

        for row_num, row in enumerate(selected_data):
            for col_num, cell in enumerate(row):
                self.grid.SetCellValue(row_num, col_num, cell)

        self.grid.AutoSizeColumns()
        self.grid.Show()


    # retrieves data for accident type page
    def retrieve_accident_types(self, event):

        self.hide_trend_components()

        selected_start_date = self.start_date_dropdown.GetString(self.start_date_dropdown.GetSelection())
        selected_end_date = self.end_date_dropdown.GetString(self.end_date_dropdown.GetSelection())
        accident_type = self.accident_type_dropdown.GetString(self.accident_type_dropdown.GetSelection())

        start_date = int(selected_start_date.split('/')[1] + selected_start_date.split('/')[0])
        end_date = int(selected_end_date.split('/')[1] + selected_end_date.split('/')[0])

        selected_data = []

        with open("victoria_accident.csv", "r") as file:
            reader = csv.reader(file)
            headers = next(reader)

            for row in reader:
                date_parts = row[4].split('/')

                date_value = int(date_parts[2] + date_parts[1])

                if row[7] == accident_type and start_date <= date_value <= end_date:
                    selected_data.append(row)

        selected_data.sort(
            key=lambda x: datetime.date(int(x[4].split('/')[2]), int(x[4].split('/')[1]), int(x[4].split('/')[0])))

        self.modify_grid(len(selected_data), len(headers))
        for col_num, header in enumerate(headers):
            self.grid.SetColLabelValue(col_num, header)

        for row_num, row in enumerate(selected_data):
            for col_num, cell in enumerate(row):
                self.grid.SetCellValue(row_num, col_num, cell)

        # Auto size columns
        self.grid.AutoSizeColumns()
        self.grid.Show()
        self.grid.SetPosition((150, 150))


app = wx.App()
frame = MainPage(None)
frame.Show()
app.MainLoop()

