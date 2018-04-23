class AppointmentsController < ApplicationController
  def show
    @appointment = Appointment.find(params[:id])
    render json: @appointment
  end

  def index
    @appointments = Appointment.order('apt_time ASC')
    @appointment = Appointment.new
    respond_to do |format| 
      format.html
      format.json {render json: @appointments}
    end
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

  def set_appointment
    @appointment = Appointment.find(params[:id])
  end
end
