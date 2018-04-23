class AppointmentsController < ApplicationController
  def index
    @appointments = Appointment.order('apt_time ASC')
    @appointment = Appointment.new
  end

  def create
    @appointment = Appointment.new(appointment_params)
    #remember never save! validation wont work
    if @appointment.save
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocesable_entity
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(
      :title,
      :apt_time
    )
  end
end
