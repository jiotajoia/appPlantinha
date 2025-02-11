import 'package:app_plantinha/controllers/services/results_service.dart';
import 'package:app_plantinha/view/pages/results_screen.dart';
import 'package:app_plantinha/view/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';

class SearchByMapsPage extends StatefulWidget {
  const SearchByMapsPage({super.key});

  @override
  State<SearchByMapsPage> createState() => _SearchByMapsPageState();
}

class _SearchByMapsPageState extends State<SearchByMapsPage> {
  final ResultsService resultsService = ResultsService();
  late GoogleMapController mapController;
  final Location _location = Location();
  LatLng? localizacao;
  Set<Marker> marcadores = {};

  final LatLng _center = const LatLng(-5.088224152364843, -42.8120294069581);

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }

  carregarMarcadores() async {
    String baseSnipet = 'clique para ver plantas encontradas neste pais';
    Set<Marker> marcadorLocal = {};

    List<Map<String, dynamic>> paises = [
      {'nome': 'Brasil', 'lat': -20.022787, 'lng': -45.816267},
      {'nome': 'Estados Unidos', 'lat': 37.0902, 'lng': -95.7129},
      {'nome': 'Canadá', 'lat': 56.1304, 'lng': -106.3468},
      {'nome': 'França', 'lat': 46.6034, 'lng': 1.8883},
      {'nome': 'Alemanha', 'lat': 51.1657, 'lng': 10.4515},
      {'nome': 'Austrália', 'lat': -25.2744, 'lng': 133.7751},
      {'nome': 'Japão', 'lat': 36.2048, 'lng': 138.2529},
      {'nome': 'China', 'lat': 35.8617, 'lng': 104.1954},
      {'nome': 'Índia', 'lat': 20.5937, 'lng': 78.9629},
      {'nome': 'África do Sul', 'lat': -30.5595, 'lng': 22.9375},
    ];

    for (var pais in paises) {
      Marker marcador = Marker(
        markerId: MarkerId(pais['nome']),
        position: LatLng(pais['lat'], pais['lng']),
        infoWindow: InfoWindow(
          title: pais['nome'],
          snippet: baseSnipet,
          onTap: () async {
            try {
              var resultado = await resultsService.obterResultadoMapa(pais['nome']);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('resultado é $resultado'),
                  duration: Duration(seconds: 20),
                ),
              );
              // ignore: use_build_context_synchronously
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ResultsScreen(
                    title: 'Results Page',
                    resultado: resultado,
                  ),
                ),
              );
            } catch (e) {
              // ignore: use_build_context_synchronously
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Erro ao criar resultado: $e')),
              );
            }
          },
        ),
      );

      marcadorLocal.add(marcador);
    }

    setState(() {
      marcadores = marcadorLocal;
    });
  }

  checkPermission() async {
    final permissionStatus = await _location.requestPermission();
    final serviceEnabled = await _location.serviceEnabled();

    if (permissionStatus == PermissionStatus.granted && serviceEnabled) {
      // Localização disponível
    } else {
      // Solicitar novamente caso necessário
      if (!serviceEnabled) {
        final serviceRequested = await _location.requestService();
        if (serviceRequested) {
          // Localização disponível
        }
      }
    }
    var local = await _location.getLocation();

    setState(() {
      localizacao = LatLng(local.latitude!, local.longitude!);
    });
  }

  @override
  void initState() {
    super.initState();
    carregarMarcadores();
    checkPermission();
  }

  @override
  Widget build(BuildContext context) {
    return ScaffoldBase(
      body: GoogleMap(
        myLocationEnabled: true,
        mapType: MapType.normal,
        onMapCreated: _onMapCreated,
        initialCameraPosition: CameraPosition(
          target: localizacao ?? _center,
          zoom: 1.0,
        ),
        markers: marcadores,
        zoomControlsEnabled: false,
        zoomGesturesEnabled: false,
        myLocationButtonEnabled: false,
      ),
    );
  }
}
