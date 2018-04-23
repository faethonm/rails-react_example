class AppointmentsController < ApplicationController
  def show
    @appointment = Appointment.find(params[:id])
    respond_to do |format|
      format.html {render :index } 
      format.json {render json: @appointment}
    end
  end

  def index
    @appointments = Appointment.order('apt_time ASC')
    @appointment = Appointment.new
    respond_to do |format|
      format.html
      format.json {render json: @appointments}
    end
  end

  def edit
    render :index
  end

  def update
    @appointment = Appointment.find(params[:id])
    if @appointment.update(appointment_params)
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocesable_entity
    end
  end

  def destroy
    @appointment = Appointment.find(params[:id])
    if @appointment.destroy
      head :no_content, status: :ok
    else
      render json: @appointment.errors, status: :unprocesable_entity
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
