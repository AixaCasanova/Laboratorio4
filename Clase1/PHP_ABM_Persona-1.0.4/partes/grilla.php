<?php
	require_once('clases/Alumno.php');

	$ArrayDePersonas = Alumno::TraerTodasLasPersonas();

	echo "<table class='table table-hover table-responsive'>
			<thead>
				<tr>
					<th>  Foto   </th>				
					<th>  Nombre     </th>
					<th>  Apellido   </th>
					<th>  Dni        </th>
					<th>  BORRAR     </th>
					<th>  MODIFICAR  </th>
				</tr> 
			</thead>";   	

		foreach ($ArrayDePersonas as $personaAux){
			//var_dump($personaAux->GetNombre());
			//echo $personaAux->GetId();
			echo " 	<tr>
						<td><img  class='fotoGrilla' src='fotos/".$personaAux->GetFoto()."' /></td>
						
						<td>".$personaAux->GetNombre()."</td>
						<td>".$personaAux->GetApellido()."</td>
						<td>".$personaAux->GetLegajo()."</td>
						<td><button class='btn btn-danger' name='Borrar' onclick='Borrar(".$personaAux->GetId().")'>   <span class='glyphicon glyphicon-remove-circle'>&nbsp;</span>Borrar</button></td>
						<td><button class='btn btn-warning' name='Modificar' onclick='Modificar(".$personaAux->GetId().")'><span class='glyphicon glyphicon-edit'>&nbsp;</span>Modificar</button></td>
					</tr> ";
		}	
	echo "</table>";		
?>
