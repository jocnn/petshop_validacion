export function valida(input) {
	const tipoDeInput = input.dataset.tipo

	if (validadores[tipoDeInput]) {
		validadores[tipoDeInput](input)
	}
	if (input.validity.valid) {
		input.parentElement.classList.remove("input-container--invalid")
		input.parentElement.querySelector(".input-message-error").innerHTML = ""
	} else {
		input.parentElement.classList.add("input-container--invalid")
		input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
	}
}

const tipoDeErrores = [
	"valueMissing",
	"typeMismatch",
	"patternMismatch",
	"customError",
]

function mostrarMensajeDeError(tipoDeInput, input) {
	let mensaje = ""
	tipoDeErrores.forEach(error => {
		if (input.validity[error]) {
			console.log(tipoDeInput, error)
			console.log(input.validity[error])
			console.log(mensajeDeError[tipoDeInput][error])
			mensaje = mensajeDeError[tipoDeInput][error]
		}
	})
	return mensaje
}

const mensajeDeError = {
	nombre: {
		valueMissing: "El campo nombre no puede estar vacío",
	},
	email: {
		valueMissing: "El campo email no puede estar vacío",
		typeMismatch: "El correo no es válida",
	},
	password: {
		valueMissing: "El campo contraseña no puede estar vacío",
		patternMismatch:
			"Al menos 2 caracteres, máximo 10, debe contener una letra minúscula, una letra mayúscula, un número y no debe contener caracteres especiales.",
	},
	nacimiento: {
		valueMissing: "El campo fecha no puede estar vacío",
		customError: "Debes tener al menos 18 años de edad",
	},
	telefono: {
		valueMissing: "El campo teléfono no puede estar vacío",
		patternMismatch: "El formato requerido es de 10 digitos XXXXXXXXXX"
	}
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
