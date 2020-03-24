const config = {
	details: {
		title: "World: Simple",
		summary: "This is where summary text will go",
		backgroundImage: "world.jpg"
	},
	layout: ["Home", /* "Story", */ "SimpleViewer"],
	// Story: { data: "sales" },
	defaultView: "SimpleViewer",
	SimpleViewer: {
		data: {
			sales: {
				id: "sales",
				markerOptions: "markerOptions",
				clusterOptions: "clusterOptions"
			},
			arc: {
				id: "arc",
				markerOptions: "arcOptions",
				clusterOptions: false
			}
		}
	},
	timeslider: {
		data: ["sales", "arc"],
		prop: ["Transaction_date", "created_date"]
	},
	data: {
		sales: {
			id: "sales",
			dataInput: "csv",
			options: {
				dataOutput: "geojson",
				url: "./data/SalesJan2009.csv",
				lat: "Latitude",
				lng: "Longitude"
			},
			style: {
				// prop: "Payment_Type",
				prop: "Product",
				subProp: "Payment_Type",
				styleObj: [
					// subProp values
					{
						value: "Mastercard",
						color: "#673AB7",
						icon: "mdi-hospital",
						size: "28px"
					},
					{
						value: "Visa",
						color: "#FF9800",
						icon: "mdi-hospital",
						size: "28px"
					},
					{
						value: "Diners",
						color: "#4CAF50",
						icon: "mdi-hospital",
						size: "28px"
					},
					{
						value: "Amex",
						color: "#2196F3",
						icon: "mdi-hospital",
						size: "28px"
					},
					{
						value: "Amex",
						color: "#2196F3",
						icon: "mdi-hospital",
						size: "28px"
					}
				]
			}
		},
		arc: {
			id: "arc",
			dataInput: "arcgis",
			options: {
				url:
					"https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/0"
			},
			style: {
				iconProp: "eventtype",
				prop: "arcIcon.label"
			}
		}
	}
};
