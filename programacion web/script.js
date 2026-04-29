// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Obtener el formulario
    const form = document.getElementById('formReserva');
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para validar teléfono (básica)
    function isValidPhone(phone) {
        return phone.trim().length >= 8;
    }

    // Evento submit del formulario
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener valores
        const nombre = document.getElementById('nombreReserva').value.trim();
        const email = document.getElementById('emailReserva').value.trim();
        const telefono = document.getElementById('telefonoReserva').value.trim();
        const especialidad = document.getElementById('especialidadReserva').value;
        const fecha = document.getElementById('fechaReserva').value;
        const horario = document.getElementById('horarioReserva').value;

        // Validaciones
        let errores = [];

        if (nombre === '') {
            errores.push('Por favor ingresa tu nombre completo');
            document.getElementById('nombreReserva').classList.add('is-invalid');
        } else {
            document.getElementById('nombreReserva').classList.remove('is-invalid');
        }

        if (email === '' || !isValidEmail(email)) {
            errores.push('Por favor ingresa un correo electrónico válido');
            document.getElementById('emailReserva').classList.add('is-invalid');
        } else {
            document.getElementById('emailReserva').classList.remove('is-invalid');
        }

        if (telefono === '' || !isValidPhone(telefono)) {
            errores.push('Por favor ingresa un número de teléfono válido (mínimo 8 dígitos)');
            document.getElementById('telefonoReserva').classList.add('is-invalid');
        } else {
            document.getElementById('telefonoReserva').classList.remove('is-invalid');
        }

        if (especialidad === '' || especialidad === 'Selecciona especialidad') {
            errores.push('Por favor selecciona una especialidad');
            document.getElementById('especialidadReserva').classList.add('is-invalid');
        } else {
            document.getElementById('especialidadReserva').classList.remove('is-invalid');
        }

        if (fecha === '') {
            errores.push('Por favor selecciona una fecha para tu cita');
            document.getElementById('fechaReserva').classList.add('is-invalid');
        } else {
            document.getElementById('fechaReserva').classList.remove('is-invalid');
        }

        // Si hay errores, mostrar mensaje
        if (errores.length > 0) {
            mensajeConfirmacion.classList.remove('d-none');
            mensajeConfirmacion.classList.remove('alert-success');
            mensajeConfirmacion.classList.add('alert-danger');
            mensajeConfirmacion.innerHTML = '❌ ' + errores.join('<br>');

            // Ocultar mensaje después de 4 segundos
            setTimeout(() => {
                mensajeConfirmacion.classList.add('d-none');
            }, 4000);
        } else {
            // Si todo está correcto, mostrar éxito y limpiar formulario
            mensajeConfirmacion.classList.remove('d-none');
            mensajeConfirmacion.classList.remove('alert-danger');
            mensajeConfirmacion.classList.add('alert-success');
            mensajeConfirmacion.innerHTML = '✅ ¡Reserva enviada exitosamente! Nos pondremos en contacto contigo en las próximas 24 horas.';

            // Limpiar formulario
            form.reset();

            // Remover clases de error
            const inputs = form.querySelectorAll('.is-invalid');
            inputs.forEach(input => input.classList.remove('is-invalid'));

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                mensajeConfirmacion.classList.add('d-none');
            }, 5000);

            // Aquí podrías agregar código para enviar los datos a un servidor
            console.log('Reserva enviada:', {
                nombre: nombre,
                email: email,
                telefono: telefono,
                especialidad: especialidad,
                fecha: fecha,
                horario: horario
            });
        }
    });

    // Limpiar validación al escribir en los campos
    const inputs = ['nombreReserva', 'emailReserva', 'telefonoReserva', 'especialidadReserva', 'fechaReserva'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function () {
                this.classList.remove('is-invalid');
            });
        }
    });

    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== "#" && href !== "#reservas" && href !== "#inicio") {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});