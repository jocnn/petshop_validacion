export function valida(input) {
	const tipoDeInput = input.dataset.tipo

	if (validadores[tipoDeInput]) {
		validadores[tipoDeInput](input)
	}
	if (input.validity.valid) {
		input.parentElement.classList.remove("input-container--invalid")
	} else {
		input.parentElement.classList.add("input-container--invalid")
	}
}

const mensajeDeError = {
	nombre: {
		valueMissing: "Este campo no puede estar vacío",
	},
	email: {
		valueMissing: "Este campo no puede estar vacío",
		typeMismatch: "El correo no es válida",
	},
	password: {
		valueMissing: "Este campo no puede estar vacío",
		patternMismatch:
			"Al menos 2 caracteres, máximo 10, debe contener una letra minúscula, una letra mayúscula, un número y no debe contener caracteres especiales.",
	},
	nacimiento: {
		valueMissing: "Este campo no puede estar vacío",
		customError: "Debes tener al menos 18 años de edad",
	},
}

const validadores = {
	nacimiento: (input) => validarNacimiento(input)
}

function validarNacimiento(input) {
	const fechaCliente = new Date(input.value)
	let mensaje = ""
	if (!mayorDeEdad(fechaCliente)) {
		mensaje = "Debes tener al menos 18 años de edad"
	}

	input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha) {
	const fechaActual = new Date()
	const diferenciaFechas = new Date(
		fecha.getUTCFullYear() + 18,
		fecha.getUTCMonth(),
		fecha.getUTCDate()
	)
	return diferenciaFechas <= fechaActual
}
